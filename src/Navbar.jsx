import React from "react";
import "./Navbar.css";

function Navbar({ onSearch }) {
  return (
    <>
      <div className="container">
        <a href="">Notes</a>
        <input
          type="text"
          placeholder=" Cari Catatan"
          onChange={(e) => onSearch(e.target.value)}  // Panggil onSearch saat input berubah
        />
      </div>
      <hr />
    </>
  );
}

export default Navbar;
