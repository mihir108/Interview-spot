(this["webpackJsonpinterview-spot"]=this["webpackJsonpinterview-spot"]||[]).push([[0],{115:function(e,t){},117:function(e,t){},126:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),a=n(58),i=n.n(a),r=(n(68),n(69),n(28)),s=n(3),l=n(4),u=Object(c.createContext)(),d=n(1),m=function(){var e=Object(s.f)(),t=Object(c.useContext)(u).createNewSocket;return Object(d.jsxs)("div",{className:"w-100 mx-5",children:[Object(d.jsx)("h2",{children:"New Meeting"}),Object(d.jsxs)("form",{onSubmit:function(n){n.preventDefault(),t(n.target.elements.myName.value),e("/meeting")},children:[Object(d.jsxs)("div",{className:"form-group mt-4",children:[Object(d.jsx)("label",{htmlFor:"exampleInputEmail1",children:"Enter your Name"}),Object(d.jsx)("input",{className:"form-control my-2",id:"exampleInputEmail1",name:"myName",placeholder:"Your Name"})]}),Object(d.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Submit"})]})]})},j=function(){var e=Object(s.f)(),t=Object(c.useContext)(u).connectToSocket;return Object(d.jsxs)("div",{className:"w-100 mx-5",children:[Object(d.jsx)("h2",{children:"Join Existing Meeting"}),Object(d.jsxs)("form",{onSubmit:function(n){n.preventDefault(),t(n.target.elements.myName.value),e("/meeting")},children:[Object(d.jsxs)("div",{className:"form-group mt-4",children:[Object(d.jsx)("label",{htmlFor:"exampleInputEmail1",children:"Enter Room ID"}),Object(d.jsx)("input",{className:"form-control my-2",id:"exampleInputEmail1",name:"myName",placeholder:"Room ID"})]}),Object(d.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Submit"})]})]})},b=function(){var e=Object(c.useState)(0),t=Object(l.a)(e,2),n=t[0],o=t[1],a=function(e){o(e)};return Object(d.jsxs)("div",{className:"d-flex justify-content-center my-5",children:[0===n&&Object(d.jsx)("button",{type:"button",className:"btn btn-primary mx-3",onClick:function(){a(1)},children:"Create New Meeting"}),0===n&&Object(d.jsx)("button",{type:"button",className:"btn btn-primary mx-3",onClick:function(){a(2)},children:"Join Existing Room"}),1===n&&Object(d.jsx)(m,{setFlag:o}),2===n&&Object(d.jsx)(j,{setFlag:o})]})},f=function(){var e=Object(c.useContext)(u),t=e.toggleAudio,n=e.toggleVideo;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("button",{onClick:t,children:"Toggle Audio"}),Object(d.jsx)("button",{onClick:n,className:"mx-2",children:"Toggle Video"}),Object(d.jsx)("div",{className:"mx-2 my-2",style:{height:"100px",width:"100px"},id:"video-box"})]})},g=n(37),h=n.n(g),p="7618912dbfmsh2a325e3decd2d07p1f9956jsn62222c2ff5fd";function x(e){return btoa(unescape(encodeURIComponent(e||"")))}function O(e){var t=escape(atob(e||""));try{return decodeURIComponent(t)}catch(n){return unescape(t)}}function v(e,t){var n={method:"GET",url:"https://judge0-ce.p.rapidapi.com/submissions/".concat(e),params:{base64_encoded:"true",fields:"*"},headers:{"x-rapidapi-host":"judge0-ce.p.rapidapi.com","x-rapidapi-key":"".concat(p)}};console.log("asking"),h.a.request(n).then((function(n){var c=n.data.status.description;"In Queue"===c||"Processing"===c?setTimeout((function(){v(e,t)}),1e3):t("Accepted"===c?O(n.data.stdout):"Compilation Error"===c?O(n.data.compile_output):c)})).catch((function(e){console.error(e)}))}function y(e,t,n,c){c("Compiling your code...");var o={method:"POST",url:"https://judge0-ce.p.rapidapi.com/submissions",params:{base64_encoded:"true",fields:"*"},headers:{"content-type":"application/json","x-rapidapi-host":"judge0-ce.p.rapidapi.com","x-rapidapi-key":"".concat(p)},data:{language_id:"".concat(n),source_code:"".concat(x(e)),stdin:"".concat(x(t))}};console.log("compiling"),h.a.request(o).then((function(e){v(e.data.token,c)})).catch((function(e){console.error(e)}))}var C=n(30),w=function(e){var t=e.code,n=e.setCode,o=e.lang,a=e.roomId,i=e.socket,r=Object(c.useRef)({C:{name:"c",text:"#include <stdio.h>\nint main() {\n    \n    return 0;\n}\n"},"C++":{name:"cpp",text:'#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n    cout<<"A";\n    return 0;\n}\n'},"C#":{name:"c#",text:"using System;\nstatic void Main(string[] args) {\n    \n}\n"},Java:{name:"java",text:"public static void main(String args[]){  \n    \n}\n"},JavaScript:{name:"javascript",text:" \n// Start code from here\n\n"},Python:{name:"python",text:"\n// Start code from here\n\n"}});Object(c.useEffect)((function(){i.on("code-file-change",(function(e){n(e),r.current[o].text=e}))}),[]);return Object(c.useEffect)((function(){n(r.current[o].text)}),[o]),Object(d.jsx)("div",{children:Object(d.jsx)(C.a,{height:"90vh",width:"120vh",defaultLanguage:"cpp",language:r.current[o].name,theme:"vs-dark",defaultValue:r.current[o].text,onChange:function(e){n(e),r.current[o].text=e;var t={text:e,roomId:a};i.emit("code-file-change",t)},value:t})})},k=function(){var e=Object(c.useContext)(u),t=e.roomId,n=e.socket,o=Object(c.useState)(""),a=Object(l.a)(o,2),i=a[0],r=a[1],s=Object(c.useState)(""),m=Object(l.a)(s,2),j=m[0],b=m[1],g=Object(c.useState)(""),h=Object(l.a)(g,2),p=h[0],x=h[1],O=Object(c.useState)(54),v=Object(l.a)(O,2),k=v[0],N=v[1],S=Object(c.useState)("C++"),I=Object(l.a)(S,2),E=I[0],T=I[1];Object(c.useEffect)((function(){n.on("input-file-change",(function(e){b(e)})),n.on("output-file-change",(function(e){x(e)})),n.on("lang-change",(function(e){J(e)}))}),[]);var F=function(e){x(e);var c={text:e,roomId:t};n.emit("output-file-change",c)},J=function(e){N(e),T("49"===e?"C":"54"===e?"C++":"51"===e?"C#":"62"===e?"Java":"63"===e?"JavaScript":"Python")},M=function(e){J(e.target.name),n.emit("lang-change",{newLang:e.target.name,roomId:t})};return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("h2",{children:"Code Area"}),Object(d.jsxs)("div",{className:"form-group",style:{display:"inline-flex"},children:[Object(d.jsx)(w,{socket:n,code:i,setCode:r,roomId:t,lang:E}),Object(d.jsx)(C.a,{height:"40vh",width:"40vh",theme:"vs-dark",onChange:function(e){b(e);var c={text:e,roomId:t};n.emit("input-file-change",c)},value:j}),Object(d.jsx)(C.a,{height:"40vh",width:"40vh",theme:"vs-dark",onChange:F,value:p}),Object(d.jsxs)("div",{className:"dropdown",children:[Object(d.jsx)("button",{className:"btn btn-primary dropdown-toggle",type:"button",id:"dropdownMenu2","data-bs-toggle":"dropdown","aria-expanded":"false",children:E}),Object(d.jsxs)("ul",{className:"dropdown-menu","aria-labelledby":"dropdownMenu2",children:[Object(d.jsx)("li",{children:Object(d.jsx)("button",{className:"dropdown-item",name:"49",onClick:M,type:"button",children:"C"})}),Object(d.jsx)("li",{children:Object(d.jsx)("button",{className:"dropdown-item",name:"54",onClick:M,type:"button",children:"C++"})}),Object(d.jsx)("li",{children:Object(d.jsx)("button",{className:"dropdown-item",name:"51",onClick:M,type:"button",children:"C#"})}),Object(d.jsx)("li",{children:Object(d.jsx)("button",{className:"dropdown-item",name:"62",onClick:M,type:"button",children:"Java"})}),Object(d.jsx)("li",{children:Object(d.jsx)("button",{className:"dropdown-item",name:"63",onClick:M,type:"button",children:"JavaScript"})}),Object(d.jsx)("li",{children:Object(d.jsx)("button",{className:"dropdown-item",name:"71",onClick:M,type:"button",children:"Python"})})]})]})]}),Object(d.jsx)("button",{className:"mx-2",onClick:function(){y(i,j,k,F)},children:"Compile Code"}),Object(d.jsx)(f,{})]})};var N=function(){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)(r.a,{children:Object(d.jsxs)(s.c,{children:[Object(d.jsx)(s.a,{path:"/",element:Object(d.jsx)(b,{})}),Object(d.jsx)(s.a,{path:"/meeting",element:Object(d.jsx)(k,{})})]})})})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,129)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),o(e),a(e),i(e)}))},I=n(25),E=n(38),T=n.n(E),F=n(59),J=n(63),M=n(39),R=n.n(M),A=n(128),D=Object(J.a)("http://localhost:5000"),P=function(e){var t=Object(c.useState)(null),n=Object(l.a)(t,2),o=n[0],a=n[1],i=Object(c.useState)(null),r=Object(l.a)(i,2),s=r[0],m=r[1],j=Object(c.useRef)(new Map),b=Object(c.useRef)(null),f=Object(c.useRef)(null);D.on("connect",(function(){return m(D.id)}));Object(c.useEffect)((function(){null!==o&&null!==s&&(console.log(o),D.emit("join-room",o),D.once("user-data",(function(e){console.log("got"),b.current=e})),D.on("disconnected",(function(e){console.log(e,"disconnected"),j.current.delete(e),O()})),g())}),[o,s]);var g=function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then((function(e){h(s,e),f.current=e,b.current&&b.current.forEach((function(t){x(t,e)})),D.on("new-user-joined",(function(t){console.log(t,"new joining"),p(e,t)}))})).catch((function(e){console.log(e)}))},h=function(e,t){var n=document.createElement("video");e===s&&(n.muted=!0),n.srcObject=t,console.log(e,"b"),n.addEventListener("loadedmetadata",Object(F.a)(T.a.mark((function t(){return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("playing"),t.next=3,n.play();case 3:j.current.set(e,{userVideo:n}),O();case 5:case"end":return t.stop()}}),t)}))))},p=function e(t,n){var c=new R.a({initiator:!1,trickle:!1,stream:t}),o=!1;c.on("signal",(function(e){console.log(n,"initialising"),D.emit("init-signal",{to:n,from:s,data:e})})),c.on("stream",(function(e){console.log(n,e),h(n,e)})),c.on("close",(function(){j.current.has(n)&&(j.current.delete(n),O(),c.destroy(),o=!0,e(t,n))})),c.on("error",(function(e){console.log(e)})),D.on("get-signal",(function(e){var t=e.from,a=e.data;n===t&&(console.log(n,"signal",o),o||c.signal(a))}))},x=function e(t,n){var c=new R.a({initiator:!0,trickle:!1,stream:n}),o=!1;c.on("signal",(function(e){console.log(c),D.emit("init-signal",{to:t,from:s,data:e})})),c.on("stream",(function(e){console.log(t,Date.now(),"stream"),h(t,e)})),c.on("close",(function(){j.current.has(t)&&(j.current.delete(t),O(),c.destroy(),o=!0,e(t,n))})),c.on("error",(function(e){console.log(e)})),D.on("get-signal",(function(e){var n=e.from,a=e.data;t===n&&(console.log(t,Date.now(),"signal",o),o||c.signal(a))}))},O=function(){document.getElementById("video-box").innerHTML="";var e,t=Object(I.a)(j.current.entries());try{for(t.s();!(e=t.n()).done;){var n=Object(l.a)(e.value,2),c=(n[0],n[1]);document.getElementById("video-box").appendChild(c.userVideo)}}catch(o){t.e(o)}finally{t.f()}console.log(j.current.entries())};return Object(d.jsx)(u.Provider,{value:{socket:D,roomId:o,toggleVideo:function(){f.current.getVideoTracks()[0].enabled=!f.current.getVideoTracks()[0].enabled},toggleAudio:function(){f.current.getAudioTracks()[0].enabled=!f.current.getAudioTracks()[0].enabled},createNewSocket:function(e){a(Object(A.a)())},connectToSocket:function(e){a(e)}},children:e.children})};i.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(P,{children:Object(d.jsx)(N,{})})}),document.getElementById("root")),S()},68:function(e,t,n){},69:function(e,t,n){}},[[126,1,2]]]);
//# sourceMappingURL=main.c7b290d7.chunk.js.map