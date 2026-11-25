import test from "node:test";
import assert from "node:assert/strict";
import { filterProjects, formatRepository, isValidEmail } from "../src/js/utils.js";

test("filterProjects returns all projects by default", () => {
  const projects = [{ category: "web" }, { category: "tools" }];
  assert.equal(filterProjects(projects).length, 2);
});

test("filterProjects returns only the requested category", () => {
  const projects = [{ category: "web" }, { category: "tools" }, { category: "web" }];
  assert.equal(filterProjects(projects, "web").length, 2);
});

test("filterProjects safely handles invalid input", () => {
  assert.deepEqual(filterProjects(null), []);
});

test("isValidEmail accepts a normal email address", () => {
  assert.equal(isValidEmail("hello@example.com"), true);
});

test("isValidEmail rejects malformed addresses", () => {
  for (const value of ["", "hello", "hello@", "@example.com", "hello @example.com"]) {
    assert.equal(isValidEmail(value), false);
  }
});

test("formatRepository normalizes missing GitHub fields", () => {
  assert.deepEqual(formatRepository({ name: "demo", stargazers_count: 3 }), {
    name: "demo", description: "No description provided.", url: "#", stars: 3, language: "Other"
  });
});