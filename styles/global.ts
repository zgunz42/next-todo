import css from 'styled-jsx/css'
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export default css.global`
  @import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

  body {
    font-family: 'Kulim Park', sans-serif;
  }
  input {
    padding: 4px;
    border-radius: 3px;
  }
  
  input[type=checkbox] { display:none; } /* to hide the checkbox itself */
  input[type=checkbox] + label:before {
    font-family: 'FontAwesome';
    display: inline-block;
  }
  input[type=checkbox] + label {font-size: 24px}
  input[type=checkbox] + label:before { content: "\f00c"; color: #ccc} /* unchecked icon */
  input[type=checkbox]:checked + label:before { content: "\f00c"; color:green } /* checked icon */
    
  .container {
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
    background-color: #cef3ff;
  }
  
  .box {
     display: flex;
     flex-direction: column;
     background-color: white;
     border-radius: 5px;
     min-width: 320px;
     min-height: 480px;
     overflow: hidden;     
     box-shadow: 0px 1px 6px 2px #0000005e;
  }
  .box-header {
    height: 60px;
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    box-shadow: 0px 1px 1px 0px #aeaeae;
  }
  .box-body {
    flex: 1;
    position: relative;
  }
  .box-footer {
    width: 100%;
    height: 60px;
  }
  .box-footer .btn.btn-primary {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .btn {
    border: 0;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
  }
  .btn.btn-trans {
    background-color: transparent;
  }
  .btn.btn-primary {
    width: 100%;
    height: 100%;
    background-color: #45a7ee;
    color: #fff;
  }
  `;
