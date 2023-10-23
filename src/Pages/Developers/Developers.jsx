import React, { useEffect, useState } from "react";
import "./developers.css";
import { Link } from "react-router-dom";
import { ProfileRef, userRef } from "./../../Firebase/firebase";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { ThreeCircles } from "react-loader-spinner";

const Developers = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  // let data={}
  async function getData() {
    setLoader(true)
    const q = query(userRef);
    const result = await getDocs(q);
    const documentsData = result.docs.map((doc) => ({
      ...doc.data(),
      uid: doc.id,
    }));
    let Data = [];
    documentsData.map(async (record, i) => {
      const pquery = query(ProfileRef, where("user_id", "==", record.uid));
      const presult = await getDocs(pquery);

      const pData = presult.docs.map((doc) => ({
        ...doc.data(),
        name: record.name,
        uid: doc.id,
      }));
      if (pData.length > 0) {
        Data.push(...pData);
      }
      if (i === documentsData.length - 1) setData(Data);

      
    });
    setLoader(false)
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <section id="developer" className="developers py-[2rem] px-[8rem]">
      <div class="title">
        <h1 className="mt-[1rem] text-[3rem] text-[#ff9f1c]">Developers</h1>
        <p className=" text-[1.5rem] text-[#ff9f1c]">
          Browse and connect with developers
        </p>
      </div>
      {
        loader?
        <div className="flex justify-center items-center h-96">
          <ThreeCircles
              height="100"
              // width="20"
              color="#ff9f1c"
              ariaLabel="tail-spin-loading"
              radius="2"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
        </div>:
        data.length>0 &&
                data.map((item,i)=>{
                    return(
                    <div class="dev-data mt-[1rem] mb-[2.5rem] p-[1rem] bg-[#f4f4f4] rounded-[15px]"> 
                

                    <img src="/img/dp.jfif" alt="" className="prof-img w-[100%] rounded-[50%]" />
                
               
                        <div className="user-info text-[#333]">
                            <h2 className="name my-[0.5rem] text-[1.5rem] font-semibold">{item.name}</h2>
                            <p className="company my-[0.5rem]">Developer at {item.company}</p>
                            <p className="seattle my-[0.5rem]">{item.location}</p>
                            <Link to={`/view-profile/${item.name}/${item.uid}`} className="view-btn inline-block w-max text-[#fff] py-[0.6rem] px-[1.2rem] my-[0.5rem] bg-[#ff9f1c] rounded-[5px] hover:bg-[#e28b11]">View Profile</Link>
                        </div>
                        <div className="user-skill">
                            <ul>
                                {
                                    item?.skills?.split(",")?.map((skill,i)=>{
                                        return(

                                            <li className='text-[#ff9f1c] list-[circle]'>{skill}</li>
                                        )
                                    })
                                }
                                
                            </ul>
                        </div>
                

            </div>
                    )
                })
            }
      {/* <div class="dev-data mt-[1rem] mb-[2.5rem] p-[1rem] bg-[#f4f4f4] rounded-[15px]"> 
                

                    <img src="/img/dp.jfif" alt="" className="prof-img w-[100%] rounded-[50%]" />
                
               
                        <div className="user-info text-[#333]">
                            <h2 className="name my-[0.5rem] text-[1.5rem] font-semibold">Dory Elsa</h2>
                            <p className="company my-[0.5rem]">Developer at Microsoft</p>
                            <p className="seattle my-[0.5rem]">Seattle, WA</p>
                            <Link to={"/view-profile"} className="view-btn inline-block w-max text-[#fff] py-[0.6rem] px-[1.2rem] my-[0.5rem] bg-[#ff9f1c] rounded-[5px] hover:bg-[#e28b11]">View Profile</Link>
                        </div>
                        <div className="user-skill">
                            <ul>
                                <li className='text-[#ff9f1c] list-[circle]'>HTML</li>
                                <li className='text-[#ff9f1c] list-[circle]'>CSS</li>
                                <li className='text-[#ff9f1c] list-[circle]'>Javascript</li>
                                <li className='text-[#ff9f1c] list-[circle]'>Python</li>
                                <li className='text-[#ff9f1c] list-[circle]'>C#</li>
                            </ul>
                        </div>
                

            </div> */}
    </section>
  );
};

export default Developers;
