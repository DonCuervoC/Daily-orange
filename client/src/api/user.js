import { ENV } from "../utils";
export class User {

    baseApi = ENV.BASE_API;

    async getMe(accessToken) {
        try {
            
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;
            return result;
            
        } catch (error) {
            throw error;
        }
    }

    async createUser(accessToken, data){

        try {
            // console.log(data);
            const formData = new FormData();
            //formData.append("firstName", data.firstname);
            Object.keys(data).forEach((key) => {
               // console.log(`${key} = ${data[key]}`);
                formData.append(key, data[key]);
            });

            if (data.fileAvatar) {
                formData.append("avatar", data.fileAvatar);
            }

            const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
            const params ={
                method: "POST",
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };
            // console.log(url);
            // console.log(params.body);

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 201) throw result;
            return result;

        } catch (error) {
            console.error(error);
        }

    }
}