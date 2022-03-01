import { CreateLaptopInput } from "../types";
import InMemoryLaptopStore, { LaptopStore } from "./laptop-store";

let store: LaptopStore;

describe("InMemoryLaptopStore", () => {
    beforeEach(() => {
        store = new InMemoryLaptopStore();
    });

    it("constructor()", () => {
        expect(store.getLaptops()).toHaveLength(4);
    });

    it("createLaptop()", () => {
        const laptopInput: CreateLaptopInput = {
            brand: "Test Brand",
            model: "Test Model",
            cpu: 1,
            ram: 1,
            storage: 1,
            price: 1,
        };

        store.createLaptop(laptopInput, "userTest");
        const laptops = store.getLaptops();

        expect(laptops).toHaveLength(5);
        expect(laptops[laptops.length - 1].brand).toEqual(laptopInput.brand);
    });
});
