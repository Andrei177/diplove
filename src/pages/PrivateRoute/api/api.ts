import { $privateApi } from "../../../app/api/privateApi";

export const updateMyActivity = async () => {
    const res = await $privateApi.get("/user/heartbeat/")

    return res.data;
}