"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./utils/logger"));
const app = express_1.default();
app.get("/", (_, res) => res.send("Hello World!"));
mongoose_1.default.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err)
        logger_1.default.error(err);
    logger_1.default.info("Successfully connected to MongoDB!");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => logger_1.default.info(`Server successfully listening on port ${PORT}`));
//# sourceMappingURL=index.js.map