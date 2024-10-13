import React, { useState } from 'react';
import "./BuatCatatan.css";
import ShowNote from './ShowNote';
import Navbar from './Navbar';  // Import Navbar untuk search bar

function BuatCatatan() {
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');  // State untuk kata kunci pencarian
    
    const addNote = () => {
        if (!inputValue || !textareaValue) return;
        const note = {
            id: Date.now(),
            title: inputValue,
            body: textareaValue,
            archived: false,
            createdAt: new Date().toLocaleDateString('id-ID', {
                weekday: 'long', // Menampilkan nama hari
                year: 'numeric', // Menampilkan tahun
                month: 'long', // Menampilkan nama bulan
                day: 'numeric' // Menampilkan tanggal
            })
        };
        event.preventDefault();
        setNotes([...notes, note]);
        setInputValue('');
        setTextareaValue('');
        
    };

    const handleDelete = (id) => setNotes(notes.filter(note => note.id !== id));
    const handleArchive = (id) => setNotes(notes.map(note => note.id === id ? { ...note, archived: true } : note));
    const handleRestore = (id) => setNotes(notes.map(note => note.id === id ? { ...note, archived: false } : note));

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase())  // Filter berdasarkan kata kunci pencarian
    );

    return (
        <>
            <Navbar onSearch={setSearchTerm} /> {/* Passing fungsi search */}
            <div className="container2">
                <div className="container-notes">
                    <h1>Buat Catatan</h1>
                    <form onSubmit={(e) => { e.preventDefault(); addNote(); }}>
                        <input
                            placeholder="Ini Adalah Judul"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <textarea
                            placeholder="Tulis Catatanmu Disini"
                            value={textareaValue}
                            onChange={(e) => setTextareaValue(e.target.value)}
                        />
                        <button type="submit" disabled={!inputValue || !textareaValue}>Buat Catatan</button>
                    </form>
                </div>
            </div>
            <ShowNote
                notes={filteredNotes}  // Passing hasil filter ke ShowNote
                onDelete={handleDelete}
                onArchive={handleArchive}
                onRestore={handleRestore}
            />
        </>
    );
}

export default BuatCatatan;
