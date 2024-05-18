
import { useState } from "react";
import './TexttoImg.css'

const TextToImg = () => {
    const API_TOKEN = "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";
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");

    async function fetchData() {
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
                {
                    headers: { Authorization: `Bearer ${API_TOKEN}` },
                    method: "POST",
                    body: JSON.stringify({ inputs: text }),
                }
            );

            const blobData = await response.blob();
            console.log(blobData);
            const imageUrl = URL.createObjectURL(blobData);
            console.log(imageUrl);
            setUrl(imageUrl);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = () => {
        fetchData();
    };

    return (
        <div className="main-container">
            <div className="input-container">
                <div>
                    <h1>AI Image Generator</h1>
                </div>
                <span>
                    <input
                        type="text"
                        placeholder="Your sentence here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={handleClick}>
                        Submit
                    </button>
                </span>
            </div>
            <div className="img-container">
                <img src={url} />
            </div>
        </div>
    );
};



export default TextToImg



