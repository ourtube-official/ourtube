var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
describe("Hello World Route", () => {
    it('should return "Hello World!"', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Hello World!");
    }));
});
//# sourceMappingURL=helloWorld.js.map