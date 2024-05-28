import supertest from "supertest";
import { expect } from "chai";
import app from "../server.js";

const request = supertest(app);
describe("AuthController-signUp", () => {
  describe("POST /api/createUser", () => {
    it("should return success with admin creating the account", async () => {
      const response = await request.post("/api/createUser").send({
        user_id: 10001,
        name: "Clint Harvey",
        password: "test",
        role: "Admin",
      });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("password");
      expect(response.body).to.have.property("role");
    });

    it("should return success with admin creating the account", async () => {
      const response = await request.post("/api/createUser").send({
        user_id: 10001,
        name: "Clint Harvey",
        password: "test",
        role: "Admin",
      });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("password");
      expect(response.body).to.have.property("role");
    });

    it("Should return error when non-admin creating the account", async () => {
      const response = await request.post("/api/createUser").send({
        user_id: 10002,
        name: "Stephen Ang",
        password: "test",
        role: "Admin",
      });

      expect(response.status).to.equal(500);
      expect(response.body).to.have.property("message");
    });

    it("Should return error when fields are empty", async () => {
      const response = await request.post("/api/createUser").send({
        user_id: 1,
        name: "",
        password: "",
        role: "",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property("message");
    });
  });
});
