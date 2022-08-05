import React, { useState } from "react";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";

interface IPFS {
    cid: CID,
    path: string
}

export const UploadIPFSFile = () => {
    const [images, setImages] = useState<IPFS[]>([]);

    let ipfs: IPFSHTTPClient | undefined;
    try {
        ipfs = create({
            url: "https://ipfs.infura.io:5001/api/v0",

        });
        console.log("IPFS", ipfs);

    } catch (error) {
        console.error("IPFS error ", error);
        ipfs = undefined;
    }

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const files = (form[0] as HTMLInputElement).files;

        if (!files || files.length === 0) {
            return alert("No files selected");
        }

        const file = files[0];
        // upload files
        const result = await (ipfs as IPFSHTTPClient).add(file);

        console.log("RESULT", result);

        setImages([
            ...images,
            {
                cid: result.cid,
                path: result.path,
            },
        ]);

        form.reset();
    };

    return (
        <div><div>{!ipfs && (
            <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}</div>
            <div>{ipfs && (
                <>
                    <p>Upload File using IPFS</p>

                    <form onSubmit={onSubmitHandler}>
                        <input name="file" type="file" />

                        <button className="border p-2" type="submit">Upload File</button>
                    </form>

                    <div>
                        {images.map((image, index) => (
                            <img
                                alt={`Uploaded #${index + 1}`}
                                src={"https://ipfs.infura.io/ipfs/" + image.path}
                                style={{ maxWidth: "400px", margin: "15px" }}
                                key={image.cid.toString() + index}
                            />
                        ))}
                    </div>
                </>
            )}</div></div>
    );
}