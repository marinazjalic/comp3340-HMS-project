import sqlite3

conn = sqlite3.connect('comp3340HMS.db')
print('connected succesfully')

conn.execute('''
    CREATE TABLE patient (
	    patient_id INTEGER PRIMARY KEY AUTOINCREMENT, 
	    patient_fname TEXT NOT NULL,
	    patient_lname TEXT NOT NULL,
	    patient_dob TEXT,
	    patient_phone TEXT UNIQUE,
	    patient_email TEXT UNIQUE,
	    patient_address TEXT,
	    patient_city TEXT,
	    patient_healthcard TEXT NOT NULL UNIQUE
	    patient_doctor INTEGER NOT NULL,
	    FOREIGN KEY(patient_doctor) REFERENCES doctor(doctor_id),
    );

    CREATE TABLE doctor (
	    doctor_id INTEGER PRIMARY KEY,
	    doctor_fname TEXT NOT NULL,
	    doctor_lname TEXT NOT NULL,
	    doctor_phone TEXT UNIQUE,
	    doctor_email TEXT UNIQUE,
	    doctor_address TEXT,
	    doctor_city TEXT
    );

    CREATE TABLE visits (
	    session_id INTEGER PRIMARY KEY AUTOINCREMENT,
	    patient TEXT NOT NULL,
	    FOREIGN KEY(patient) REFERENCES patient(patient_id),
	    doctor INTEGER NOT NULL,
	    FOREIGN KEY(doctor) REFERENCES doctor(doctor_id),
	    visit_date TEXT NOT NULL,
	    patient_illness TEXT NOT NULL,
	    patient_medicine TEXT NOT NULL
    );
''')
conn.close()

