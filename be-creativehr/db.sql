CREATE DATABASE hmimobile;

CREATE TABLE "user" (
    id serial primary key,
    username varchar(255),
    password varchar(255),
    nama varchar(255),
    email varchar(255),
    role varchar(255),
    badko varchar(255),
    cabang varchar(255),
    komisariat varchar(255),
    lk1 varchar(255),
    lk2 varchar(255),
    lk3 varchar(255),
    sc varchar(255),
    lklembaga varchar(255),
    lkkohati varchar(255),
    nohp varchar(255),
    photo varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "buku" (
    id serial primary key,
    user_id SERIAL REFERENCES "user"(id),
    judul VARCHAR(255),
    penulis VARCHAR(255),
    jumlah VARCHAR(255),
    cover VARCHAR(255),
    file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "materi" (
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES "user"(id),
    materi VARCHAR(255),
    pemateri VARCHAR(255),
    video VARCHAR(255),
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "badko" (
    badko_id SERIAL PRIMARY KEY,
    nama_badko VARCHAR(50) NOT NULL,
    logo_badko varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "cabang" (
    cabang_id SERIAL PRIMARY KEY,
    badko_id INTEGER REFERENCES "badko"(badko_id),
    nama_cabang VARCHAR(50) NOT NULL,
    website VARCHAR(100) NOT NULL,
    logo_badko varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "komisariat" (
    komisariat_id SERIAL PRIMARY KEY,
    badko_id INTEGER REFERENCES "badko"(badko_id),
    cabang_id INTEGER REFERENCES "cabang"(cabang_id),
    nama_komisariat VARCHAR(50) NOT NULL,
    logo_komisariat varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "berita" (
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES "user"(id),
    judul VARCHAR(255),
    penulis VARCHAR(255),
    berita TEXT,
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "kegiatan" (
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES "user"(id),
    nama_kegiatan VARCHAR(255),
    penyelenggara VARCHAR(255),
    startdate TIMESTAMP,
    endate  TIMESTAMP,
    alamat VARCHAR(255),
    cover VARCHAR(255),
    jumlah_donasi VARCHAR(255),
    bank VARCHAR(255),
    nama_rek VARCHAR(255),
    nama_qr VARCHAR(255),
    kode_qr VARCHAR(255),
    deskripsi VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



