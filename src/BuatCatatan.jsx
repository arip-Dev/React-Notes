import React, { useState } from 'react';    //Memanggil useState untuk menyimpan input dan textarea
import "./BuatCatatan.css"; //memanggil file css
import ShowNote from './ShowNote'; //memanggil file ShowNote
import Navbar from './Navbar';  // Import Navbar untuk search bar
import { getInitialData } from './assets'; //import asset untuk mengambil data awal

function BuatCatatan() {
    const [inputValue, setInputValue] = useState(''); //membuat state untuk input
    const [textareaValue, setTextareaValue] = useState(''); //membuat state untuk textarea
    const [notes, setNotes] = useState(getInitialData); //membuat state untuk catatan yang dibuat
    const [searchTerm, setSearchTerm] = useState('');  // State untuk kata kunci pencarian
    
    const addNote = () => {
        if (!inputValue || !textareaValue) return;
        const note = {
            id: Date.now(), // mengambil data tanggal saat catatan dibuat
            title: inputValue, // mengambil judul catatan
            body: textareaValue, // mengambil isi catatan
            archived: false, // mengambil status catatan
            createdAt: new Date().toLocaleDateString('id-ID', { // format untuk penulisantanggal
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
            })
        };
        event.preventDefault(); // mencegah untuk reload saat submit ditekan/form dikirim
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
