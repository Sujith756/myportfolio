import { describe, expect, it } from "vitest";
import { certifications, projects, skillGroups } from "@/lib/portfolio-data";
describe("portfolio facts from the supplied brief", () => {
    it("includes only the four named projects and does not invent project links", () => {
        expect(projects.map(({ title }) => title)).toEqual([
            "Farmer-to-Consumer Connect",
            "Phishing Website Detection",
            "Smart Food Delivery Analytics & Route Optimization",
            "Garbage Image Classification",
        ]);
        expect(projects.every(({ githubUrl, liveDemoUrl }) => !githubUrl && !liveDemoUrl)).toBe(true);
    });
    it("keeps skills as names without invented proficiency percentages", () => {
        expect(skillGroups.every(({ skills }) => skills.every((skill) => typeof skill === "string"))).toBe(true);
    });
    it("uses only the certification dates provided", () => {
        expect(certifications.map(({ title, date }) => [title, date ?? null])).toEqual([
            ["Java Programming", "December 2024"],
            ["Explore Machine Learning Using Python", "December 2024"],
            ["Swecha AI", "August 2024"],
            ["Deep Learning Internship", null],
        ]);
    });
});
