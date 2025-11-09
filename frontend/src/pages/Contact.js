import React, { useState } from 'react';
export default function Contact(){
  const [msg,setMsg] = useState('');
  return (
    <div>
      <h2>Contact / Feedback</h2>
      <form className="card" onSubmit={(e)=>{e.preventDefault(); alert('Thanks for feedback'); setMsg('');}}>
        <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Your message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
