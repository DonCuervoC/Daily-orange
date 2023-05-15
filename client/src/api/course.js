import { ENV } from "../utils";

export class Course {

    baseApi = ENV.BASE_API;

    async getCourse(params) {

        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSES}?${pageFilter}&${limitFilter}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw (error);
        }
    }

}