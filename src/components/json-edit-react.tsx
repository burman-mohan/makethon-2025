
import { JsonEditor } from "json-edit-react";
import React, { useEffect } from "react";

export default function JsonEditReact({ model, directory_id }: { model: string, directory_id: string }) {

    const [jsonData, setJsonData] = React.useState({
        name: "John Doe",
        age: 30,
        email: "abc@infy.com",
        address: {
            city: "Bangalore",
            state: "Karnataka",
            pin: 560001
        },
        phone: [
            {
                type: "home",
                number: "1234567890"
            },
            {
                type: "work",
                number: "0987654321"
            }
        ],
        work: {
            company: "Infosys",
            location: "Bangalore"
        },
        hobbies: ["reading", "music", "travel"],
        active: true,
        dob: "1990-01-01",
        anniversary: "2020-01-01",
        travel: [
            {
                destination: "Goa",
                duration: "3 days"
            },
            {
                destination: "Ooty",
                duration: "2 days"
            }
        ]
    });
    const fetchJsonData = async () => {
        const response = await fetch("http://localhost:8086/api/llm/fetch/json", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              model: model,
              directory_id: directory_id,
            }),
          });

        const data = await response.json();
        return data;
    };
    useEffect(() => {
        console.log("model", model);
        console.log("directory_id", directory_id);

        if(model && directory_id){
            fetchJsonData().then(data => setJsonData(data));
        }

    }, [model]);
  return (
    <>
      <JsonEditor
        data={jsonData}
        
      />
    </>
  );
}
