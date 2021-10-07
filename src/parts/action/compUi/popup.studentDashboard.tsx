import "../styles/student.css";

type StudentProps = {
  avatar: any;
  firstName: string;
  logout: any;
};

const StudentDashboard = ({ avatar, firstName, logout }: StudentProps) => {


  return (
      <div>
        <div className="studentMain">
          <h2> Bienvenue {firstName} </h2>
          <div className="studentInfo">
            <img src={avatar} alt="avatar" className="avatar" />
            <p> mon profil </p>
            <p> dashboard</p>
          </div>
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
        <button onClick={logout}>LOGOUT</button>
      </div>
    </div>
  );
};
export default StudentDashboard;
