import { ApiCallService } from "@/services/http";
import { setglobalDataAction } from "../slices/global-data";

export const getglobalData = () => {
    return async (dispatch: any) => {
        try {
            const response = await ApiCallService(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/all_reciepe`,
                "GET"
            );

            if (response && response.receiepes) {
                dispatch(setglobalDataAction(response.receiepes));
            }
        } catch (error) {
            console.error("Failed to fetch recipes:", error);
        }
    }
}
