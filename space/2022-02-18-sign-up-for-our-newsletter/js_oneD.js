document.getElementById('take-survey-button')?.addEventListener("click", () => {

const surveyIframe = document.getElementById('survey-iframe-container');

if (surveyIframe) {
let iframe = document.createElement('iframe');
iframe.id ="ownership-survey";
iframe.src="https://docs.google.com/forms/d/e/1FAIpQLScz3s3WI6_oz2CnrsSyo4rZZac7s15eILnlD9g2dQajyFNfvA/viewform?embedded=true";

iframe.setAttribute("width", "100%");
iframe.setAttribute("height", "1783");
iframe.setAttribute("frameborder", "0"); 
iframe.setAttribute("marginheight", "0");
iframe.setAttribute("marginwidth", "0");
iframe.innerHTML = "<p style=\"width:100%;text-align:center;color:#ffffff;\">Loading…</p>";
iframe.style = "width:100%;max-width:640px;"
surveyIframe.appendChild(iframe);

} else {
console.log(`Survey button clicked, but javascript could not find div with id 'survey-iframe-container'`);
} //end if surveyIframe

}); //end on click
