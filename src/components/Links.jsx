import React,{useEffect, useState} from "react";
import LinkForm from "./LinkForm";
import {db} from '../firebase'
import { toast } from "react-toastify";

const Links = () => {

  const [Links, setLinks] = useState([]);
  const [currentId, setCurrentId] =useState('');


const addOrEditLink = async (linkObject) => { 
  if (currentId === '') {
      await db.collection("links").doc().set(linkObject);
      toast("New Link Added", {
        type: "success",
      });
  } else{
    await db.collection('links').doc(currentId).update(linkObject);
    toast("Link Updated Successfully", {
      type: "info",
    });
    setCurrentId('');
  }
};

  const OnDeleteClick = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {    
    await db.collection('links').doc(id).delete();
    toast("Link Removed Successfully", {
      type: "error",
      autoClose: 2000,
    });
    }
  };

  const getLinks = async () => {
    db.collection('links').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {             
             docs.push({...doc.data(), id:doc.id});
          });
      setLinks(docs);
    });
  };

  useEffect(() => {
      getLinks();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-8 p-2">
          <LinkForm {...{ addOrEditLink, currentId, Links }} />
        </div>
        <div className="col-md-8 p-2">
          {Links.map((link) => (
            <div className="card mb-1" key={link.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4>{link.websitename}</h4>
                  <div>
                    <i
                      className="material-icons"
                      onClick={() => setCurrentId(link.id)}
                    >
                      create
                    </i>
                    <i
                      className="material-icons text-danger"
                      onClick={() => OnDeleteClick(link.id)}
                    >
                      close
                    </i>
                  </div>
                </div>
                <p>{link.description}</p>
                <a href={link.urlweb} target="_blank" rel="noopener noreferrer">
                  Go to Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links;
