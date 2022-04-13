/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Log in to application");
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
    cy.get("input:first").type("admin");
    cy.get("input:last").type("admin");
    cy.get("#login-button").click();
    cy.contains("Admin logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "admin", password: "admin" });
      // cy.contains("log in").click();
      // cy.get("input:first").type("admin");
      // cy.get("input:last").type("admin");
      // cy.get("#login-button").click();
    });

    it("a new blog can be created", function () {
      cy.createBlog({
        title: "a blog created by cypress",
        author: "admin",
        url: "thedots.site",
        likes: "12",
      });
      // cy.contains("Create Blog").click();
      // cy.get("#title").type("a blog created by cypress");
      // cy.get("#author").type("admin");
      // cy.get("#url").type("thedots.site");
      // cy.get("#likes").type("10");
      // cy.get("#create-blog").click();
      cy.contains("a blog created by cypress");
      cy.contains("admin");
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("log in").click();
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("#login-button").click();
    cy.get(".notification")
      .should("contain", "wrong username or password")
      .should("have.css", "color", "rgb(255, 0, 0)")
      .should("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Admin logged in");
  });
});
