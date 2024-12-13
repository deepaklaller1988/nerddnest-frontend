"use client";
import React, { useState, useEffect } from "react";
import TabContent from "./Tabcontent";
import { useApi } from "@/hooks/useAPI";
import { useSelector } from "react-redux";
import Image from "next/image";
import { capitalizeName } from "@/utils/capitalizeName";
import { useRouter } from "next/navigation";

const FriendSuggestion = () => {
    const { API } = useApi()
    const router=useRouter()
    const userId = useSelector((state: any) => state.auth.id);
    const [suggestData, setSuggestData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (userId) {
            friendSuggestion()

        }
    }, [userId])

    const friendSuggestion = async () => {
        const { success, error, data } = await API.get(`friends/suggestions?userId=${userId}`);
        if (success) {
            setSuggestData(data)
        }
        else {
            console.log(error);
        }
    };
    return (
        <TabContent
            title="FRIENDS SUGGESTIONS"
            items={suggestData}
            isLoading={loading}
            noItemsMessage={"There are no friend Suggestion"}
            viewAllText="View All"
            renderItem={(suggestData: any) => (
                <section key={suggestData.id} className="cursor-pointer flex items-center gap-2">
                    <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                        <Image
                            height={50}
                            width={50}
                            className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                            src={suggestData.image||"/profile-avatar-legacy-50.png"}
                            alt="group logo"
                        />
                    </span>
                    <span>
                    <h6 className="text-white font-semibold" onClick={()=>router.push(`/users?id=${suggestData.id}`)}>{capitalizeName(suggestData.firstname)} {capitalizeName(suggestData.lastname)}</h6>
                    <p className="text-[13px] text-gray-500/50">active 3 days ago</p>
                    </span>
                </section>
            )}
        />
    );
};

export default FriendSuggestion;