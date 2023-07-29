import sqlite3

conn = sqlite3.connect('comp3340HMS.db')
print('opened succesfully')

conn.execute("INSERT INTO patient(patient_id, patient_fname, patient_lname, patient_dob, patient_phone, patient_email, patient_address, patient_city, patient_healthcard, patient_doctor)\
             VALUES ( , 'John', 'Smith', '01/01/1975', '519-555-0123', 'john.smith@email.com', '123 main st', 'Windsor', '123456789HC', )")


conn.execute("INSERT INTO doctor(doctor_id, doctor_fname, doctor_lname, doctor_phone, doctor_email, doctor_address, doctor_city)\
             VALUES ( , 'Jane', 'Doe', '519-555-9876', 'drjanedoe@email.com', '987 riverside st', 'Windsor')")

conn.execute("INSERT INTO visits(session_id, patient, doctor, visit_date, patient_illness, patient_medicine)\
             VALUES (12345, , , '29/07/2023', 'Flu', 'Advil Flu & Sinus')")

conn.commit()
print("Records Added")
conn.close()

