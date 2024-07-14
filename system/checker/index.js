"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const bcrypt = __importStar(require("bcrypt"));
const child_process_1 = require("child_process");
const express_1 = require("express");
const node_util_1 = require("node:util");
const constants_1 = require("../../controllers/http/constants");
const typescript_1 = require("../../activities/typescript");
const product_1 = __importDefault(require("../../models/product"));
const product_category_1 = __importDefault(require("../../models/product-category"));
const user_1 = __importDefault(require("../../models/user"));
function buildTypescriptErrorMessage(expected, received, varName) {
    return `Please ensure that the logic of function \`${varName}\` is correct and only the specified portions have been modified.

  Expected:
  \`\`\`ts
  ${JSON.stringify(expected, undefined, 4)}
  \`\`\`

  Received:
  \`\`\`ts
  ${JSON.stringify(received, undefined, 4)}
  \`\`\`
  `;
}
const execAsync = (0, node_util_1.promisify)(child_process_1.exec);
const router = (0, express_1.Router)();
const PATH_PREFIX = '/checker';
let i = 0;
function generateId() {
    return i++;
}
router.get(`${PATH_PREFIX}/http/products`, (req, res) => {
    res.send(constants_1.PRODUCTS);
});
router.get(`${PATH_PREFIX}/http/products/:id`, (req, res) => {
    const product = constants_1.PRODUCTS.find((product) => product.id === parseInt(req.params.id));
    res.send(product ? product : { product: null });
});
router.post(`${PATH_PREFIX}/http/products`, (req, res) => {
    const product = Object.assign({ id: generateId() }, req.body);
    constants_1.PRODUCTS.push(product);
    return res.send(product);
});
router.post(`${PATH_PREFIX}/http/products/truncate`, (req, res) => {
    while (constants_1.PRODUCTS.length > 0) {
        constants_1.PRODUCTS.pop();
    }
    return res.send();
});
router.post(`${PATH_PREFIX}/products/truncate`, async (req, res, next) => {
    await product_1.default.truncate();
    return res.send();
});
router.post(`${PATH_PREFIX}/products`, async (req, res, next) => {
    let product;
    try {
        product = await product_1.default.create(Object.assign({}, req.body));
    }
    catch (e) {
        const error = e;
        return next(boom_1.default.badRequest(error.message));
    }
    return res.send(product);
});
router.get(`${PATH_PREFIX}/products`, async (req, res, next) => {
    let products = [];
    try {
        products = await product_1.default.findAll(Object.assign({}, req.body));
    }
    catch (e) {
        const error = e;
        return next(boom_1.default.badRequest(error.message));
    }
    return res.send(products);
});
router.get(`${PATH_PREFIX}/products/:id`, async (req, res, next) => {
    let product = null;
    try {
        product = await product_1.default.findOne({
            where: {
                id: req.params.id,
            },
        });
    }
    catch (e) {
        const error = e;
        return next(boom_1.default.badRequest(error.message));
    }
    if (!product) {
        throw boom_1.default.notFound();
    }
    return res.send(product);
});
router.post(`${PATH_PREFIX}/users/by-username`, async (req, res, next) => {
    let user;
    try {
        user = await user_1.default.findOne(Object.assign({}, req.body));
    }
    catch (e) {
        const error = e;
        return next(boom_1.default.badRequest(error.message));
    }
    return res.send(user);
});
router.post(`${PATH_PREFIX}/product-categories`, async (req, res, next) => {
    let productCategory;
    try {
        productCategory = await product_category_1.default.create(Object.assign({}, req.body));
    }
    catch (e) {
        const error = e;
        return next(boom_1.default.badRequest(error.message));
    }
    return res.send(productCategory);
});
router.post(`${PATH_PREFIX}/product-and-product-categories`, async (req, res) => {
    let product, productCategory;
    try {
        productCategory = await product_category_1.default.create({
            name: 'test_category',
        });
        product = await product_1.default.create({
            name: 'test',
            description: 'test',
            currency: 'USD',
            price: 10,
            productCategoryId: productCategory.id,
        });
    }
    catch (e) {
        const error = e;
        throw boom_1.default.badRequest(error.message);
    }
    return res.send({ product, productCategory });
});
router.get(`${PATH_PREFIX}/product-with-category/:id`, async (req, res) => {
    const product = await product_1.default.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: product_category_1.default,
                required: true,
            },
        ],
    });
    return res.send(product);
});
router.post(`${PATH_PREFIX}/user-without-role`, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await user_1.default.create({
        username: req.body.username,
        password: hashedPassword,
    });
    return res.send(user);
});
router.post(`${PATH_PREFIX}/user-with-role`, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await user_1.default.create({
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role,
    });
    return res.send(user);
});
router.post(`${PATH_PREFIX}/typescript-checker`, async (req, res) => {
    const { activityName, checks } = req.body;
    const [typescriptResult, eslintResult] = await Promise.allSettled([
        execAsync(`npx tsc -p activities/typescript/${activityName}/ --noEmit`),
        execAsync(`npx eslint activities/typescript/${activityName}/ --format=json`),
    ]);
    if (typescriptResult.status === 'rejected') {
        return res.send({
            typescriptResult: {
                errorMessage: typescriptResult.reason,
            },
        });
    }
    else {
    }
    if (eslintResult.status === 'rejected') {
        return res.send({
            eslintResult: {
                errorMessage: eslintResult.reason,
            },
        });
    }
    const activity = await (0, typescript_1.getCurrentActivity)(activityName);
    const activityResultKeyValueMap = new Map();
    await Promise.all(checks.map(async (check) => {
        const { varName, isFunction, parameters, checkIdentifier } = check;
        if (isFunction) {
            if (typeof activity[varName] !== 'function') {
                return activityResultKeyValueMap.set(checkIdentifier, {
                    isFunction: false,
                });
            }
            const output = await activity[varName](...parameters);
            return activityResultKeyValueMap.set(checkIdentifier, {
                isFunction: true,
                actualFunctionOutput: output,
            });
        }
        return activityResultKeyValueMap.set(checkIdentifier, {
            isFunction: false,
            actualVariableOutput: activity[varName],
        });
    }));
    return res.send({
        activityResults: Object.fromEntries(activityResultKeyValueMap),
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map