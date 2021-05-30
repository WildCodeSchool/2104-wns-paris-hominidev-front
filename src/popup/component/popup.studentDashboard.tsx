const StudentDashboard = () => {
   return (
      <div className="offline">
         <div className="mainStudent">
            <p> avatar </p>
            <p> mon profil </p>
            <p> dashboard</p>
         </div>
         <div>
            <div className="studentGroupe">
               <div>
                  <p> Mes groupes </p>
                  <label id="groupe1" htmlFor=" groupe1">
                     <input type="checkbox" name="groupe1" />
                     Groupe 1
                  </label>
               </div>
               <div>
                  <label htmlFor="groupe2">
                     <input id="groupe2" name="groupe2" type="checkbox" />
                     Groupe 2
                  </label>
               </div>
            </div>
         </div>
      </div>
   );
};
export default StudentDashboard;
