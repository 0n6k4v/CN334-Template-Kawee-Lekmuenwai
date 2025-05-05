import { useState, useEffect } from 'react';

export default function MyInfo() {
    const [info, setInfo] = useState(null);
    const [infoList, setInfoList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("jwt_access");
            const res = await fetch("http://127.0.0.1:3342/api/myinfo", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setInfo(data);
            setInfoList(
                Object.keys(data.data).map((info_key) => (
                    <li key={info_key}>{data.data[info_key]}</li>
                ))
            );
        };
        fetchData();
    }, []);

    if (!info) return <p>Loading...</p>;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div
                style={{ fontSize: "64px" }}
                className="w-full flex flex-col justify-center items-center dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            >
                <div>{info.data.fullname} Info</div>
                <ul>{infoList}</ul>
            </div>
        </main>
    );
}
