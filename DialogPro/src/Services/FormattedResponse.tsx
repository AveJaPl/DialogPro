import {useEffect, useState} from "react";

type FormattedResponseProps = {
    response: string
}


function FormattedResponseWrapper({response}: FormattedResponseProps) {
    const [formattedResponse, setFormattedResponse] = useState<string>("");
    useEffect(() => {
        const formattedResponse = (response: string) => {
            // replace content between ( and ) with short version
            response = response.replace(/\[(.*?)\]/g, "$1 ");
            // replace content between [ and ] with <a> tag with href
            response = response.replace(/\((.*?)\)/g, "<a href='$1' target='_blank' class='text-s font-bold text-red-600'>link</a><br>");

            setFormattedResponse(response);
        }

        formattedResponse(response);
    },[response]);
    return (
        <div dangerouslySetInnerHTML={{__html: formattedResponse}}></div>
    )
}


export default FormattedResponseWrapper;