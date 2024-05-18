import { useState } from "react";
import './TexttoImg.css'

const TextToImg = () => {
    const API_TOKEN = "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";
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchData() {
        setLoading(true);
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
                {
                    headers: { Authorization: `Bearer ${API_TOKEN}` },
                    method: "POST",
                    body: JSON.stringify({ inputs: text }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch image");
            }

            const blobData = await response.blob();
            const imageUrl = URL.createObjectURL(blobData);
            setUrl(imageUrl);
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
        setLoading(false);

    }

    const handleClick = () => {
        if (text !== "") {
            fetchData();
        } else {
            alert("Add Input");
        }
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
                    <button
                        style={{ border: "1px solid black", padding: "5px", borderRadius: "5px" }}
                        onClick={handleClick}
                    >
                        Submit
                    </button>
                </span>
            </div>
            <div className="img-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{color:"red", fontSize:"20px"}}>{error}</p>
                ) : (
                    <img src={url}/>
                )}
            </div>
        </div>
    );
};

export default TextToImg;
