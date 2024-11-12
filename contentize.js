document.addEventListener("DOMContentLoaded", () => {
        const contentize = () => {
            // Fetch content from <pre> tag
            const fetchContent = () => {
                const preData = document.getElementById("content-data");
                return preData ? Promise.resolve(preData.innerText) : Promise.resolve("");
            };

            // Parse the text into an object for replacements
            const parseContent = (content) => {
                const data = {};
                const lines = content.split("\n");
                let currentKey = "";
                lines.forEach(line => {
                    if (line.startsWith("@")) {
                        currentKey = line.trim();
                        data[currentKey] = "";
                    } else if (currentKey) {
                        data[currentKey] += (data[currentKey] ? " " : "") + line.trim();
                    }
                });
                return data;
            };

            // Replace placeholders in the HTML
            const replaceContent = (data) => {
                Object.keys(data).forEach(key => {
                    const elements = document.querySelectorAll(`body *:not(script):not(style)`);
                    elements.forEach(el => {
                        if (el.innerText.includes(key)) {
                            el.innerText = el.innerText.replace(key, data[key]);
                        }
                    });
                });
            };

            // Run contentize process
            fetchContent().then(content => {
                const dataContent = parseContent(content);
                replaceContent(dataContent);
            });
        };

        contentize();
    });