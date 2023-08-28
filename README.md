Background:
In a Hospital Information System, we must keep the patient details records with the below data

Patient Object

Patient {

                Id: GUID,

                Name: String,

                FileNo: Number,

                CitizenId: String,

                Birthdate: Date,

                Gender: 0 for Male  1 for Female,

                Natinality: String,

                PhoneNumber: String,

                Email: String,

                Country: String,

                City: String,

                Street: String,

                Address1: String,

                Address2: String,

                ContactPerson: String,

                ContactRelation: String,

                ContactPhone: String,

                FirstVisitDate: Date,

                RecordCreationDate: Date

}

Assignment:

Please create the following Restful APIs in C#.
Patient Add: a POST API that receives a patient object (Id and RecordCreationDate shouldn't be sent within the request) then validates the data, save it into a DB (using entity framework core 7) and returns the Id.
Patient Delete: a DELETE API that receives a patient Id, deletes it from the DB.
PatientList: a GET API that returns the patients list with pagination and the following search criteria:
Name
FileNo
PhoneNumber
Also please create a UI using Angular to call the above API to display the list of patients in a table and be able to delete any of them, and create a new patient.
I need the List, Add and Update to be in separate components, not in one component.
Tech Versions Required:
.NET Core 7
Angular 13+
  

Extra requirements:

Need the Add\Update to be in the same component and to be opened in a modal, not showed in the page itself.
Need to support the module lazy loading in Angular.
Need filters of the List Patients component, to be in separate component, (the criteria and the search button altogether), and not in the same parent component that contains the table and the list data.
After adding\updating and deleting the items, the table should be updated without refreshing the page.
Need to support opening the modal by changing the URL, like in Facebook or other sites, if there was an opened modal, you can copy the URL and send it to someone, if they opened the same exact URL the modal will open by itself. 
