
        // Get elements

        const appointmentsNav = document.getElementById('appointmentsNav');
        const questionsNav = document.getElementById('questionsNav');
        const newsNav = document.getElementById('newsNav');
        const resourcesNav = document.getElementById('resourcesNav');
        const contentArea = document.getElementById('contentArea');
        const modal = document.getElementById('modal');
        let activeSection = ''; 

        // Show appointments section


        appointmentsNav.addEventListener('click', () => {
            activeSection = 'appointments';
            getAppointments();
            
             
        });

       const getAppointments = async () =>{

            const response = await fetch('http://localhost:5700/api/getAppointment');

            const appointments = await response.json(response);

            contentArea.innerHTML = `
                <div class="section-title">Appointments</div>
                <div class="card">
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>email</th>
                                <th>phone</th>
                                <th>date and time</th>
                                <th>reason</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody> 
                         ${appointments.map(appointment => `
                                <tr>
                                <td>${appointment.name}</td>
                                <td>${appointment.email}</td>
                                <td>${appointment.phone}</td>
                                <td>${appointment.date}</td>
                                <td>${appointment.reason}</td>
                                <td>
                                    <a href = "mailto: ${appointment.email}"> <button class="action-btn accept">Accept</button></a>
                                    <button class="action-btn reject" onclick="rejectAppointment(${appointment.appointment_id})">Reject</button>
                                </td>
                            </tr> `
                            ).join('')}
                        
                        </tbody>
                    </table>
                </div>
            `;
            
        };

        // Show questions section

        questionsNav.addEventListener('click' , () => {
            activeSection = 'questions';
            getQuestions();

        })
        const getQuestions = async () =>{

            
            
            const response = await fetch('http://localhost:5700/api/getUserQuestion')

            const userQuestions = await response.json();
          
            contentArea.innerHTML = `   

                <div class="section-title">Farmers' Questions</div>
                <div class="card">
                    <table>

                        <thead>
                            <tr>
                                <th>name</th>
                                <th>email/phone</th>
                                <th>question</th>
                                <th>address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                                     
                        ${userQuestions.map(question => `
                             
                            <tr>
                            
                              <td>${question.name}</td>
                              <td>${question.emailorphone}</td>
                              <td>${question.question_text}</td>
                              <td>${question.address}</td>

                              <td> <a href = "mailto:${question.emailorphone}">
                              <Button class = "action-btn accept"> Answer this question</Button>
                              </a>
                            </tr>


                        `).join('questions from farmers')}
                        </tbody>

                    </table>
                </div>
            `;
            
        };

        // Show news and events section

        newsNav.addEventListener('click' , () =>{
            activeSection = 'news';
            getNews();
        })
        const getNews = async () => {
            

            const response = await fetch('http://localhost:5700/api/news-events?language_code=en')
            
            const newsEvents = await response.json();

            // Title	Type	Description	Actions

            contentArea.innerHTML = `
                <div class="section-title">News & Events</div>
                <div class="card">
                    <table>
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>type</th>
                                <th>description</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            ${newsEvents.map(newsEvent => `
                              
                             <tr>
                             <td>${newsEvent.title}</td>
                             <td>${newsEvent.type}</td>
                             <td>${newsEvent.description}</td>
                             </tr>
                            
                            `)}

                        </tbody>
                    </table>
                </div>
            `;
            
        };

        // Show resources section
        resourcesNav.addEventListener('click', async () => {

            const response = await fetch('http://localhost:5700/api/resources?language_code=en');
            const resources = await response.json();

            contentArea.innerHTML = `
                <div class="section-title">Resources</div>
                <div class="card">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Description</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            
                             
                            ${resources.map(resource => 
                        
                             `<tr>
                              
                              <td>${resource.title}</td>
                              <td>${resource.type}</td>
                              <td>${resource.description}</td>
                              
                             </tr>`

                           ).join('')}



                        </tbody>
                    </table>
                </div>
            `;
            activeSection = 'resources';
        });


        // Handle rejecting an appointment
        async function rejectAppointment(appointment_id) {

            try {
                const response = await fetch(`http://localhost:5700/api/delete_appointment/${appointment_id}`, {
                     method: 'DELETE'
                });
        
                if (response.ok) {
                    alert('appointment deleted successfully')
                    getAppointments();
                } else {
                   alert('faild to deleted appointment');
                }
            } catch (error) {
                 alert('sorry something went wrong')
            }
            
        }

        // Close modal when clicked outside
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
   