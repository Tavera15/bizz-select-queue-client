import React from "react";
import { Card, Button } from "react-bootstrap";

function FileDisplay({url, editingMode, btnAction})
{
    function base64ImageToBlob(str) {
        // extract content type and base64 payload from original string
        var pos = str.indexOf(';base64,');
        var type = str.substring(5, pos);
        var b64 = str.substr(pos + 8);
        
        // decode base64
        var imageContent = atob(b64);
        
        // create an ArrayBuffer and a view (as unsigned 8-bit)
        var buffer = new ArrayBuffer(imageContent.length);
        var view = new Uint8Array(buffer);
        
        // fill the view, using the decoded base64
        for(var n = 0; n < imageContent.length; n++) {
            view[n] = imageContent.charCodeAt(n);
        }
        
        // convert ArrayBuffer to Blob
        var blob = new Blob([buffer], { type: type });
        
        return blob;
    }

    return(
        <Card className="col-6 col-md-4 col-lg-3">
            <Card.Img style={{width: "100%", aspectRatio: "1/1", "objectFit": "contain"}} variant="top" src={url} />
            <Card.Body>
                {
                    editingMode
                        ?   <Button onClick={(e) => btnAction(e, url)} className="col-12" variant="danger">Delete</Button>
                        :   <a href={url} download={base64ImageToBlob(url)} target='_blank'><Button variant="primary">Download</Button></a>
                }
            </Card.Body>
        </Card>
    )
}

export default FileDisplay;