import { Context, Laptop } from "../../types";

const Laptop = {
    async createdBy(parent: Laptop, _, { request }: Context) {
        return await request.userStore.getUser(parent.createdBy);
    },
    async ratings(parent: Laptop, _, { request }: Context) {
        const laptopRatings = await request.rateStore.getLaptopRatings(parent.id);

        let count = 0;
        let sum = 0;
        laptopRatings.forEach((r) => {
            count++;
            sum += r.rating;
        });

        return {
            count,
            avg: sum / count,
            ratings: laptopRatings,
        };
    },
};

export default Laptop;
