import Student from "../models/student.model.js";

export const getAllStudent = async (req,res) =>{
    try{
        const students = await Student.find();
        res.status(200).render('students.ejs',{
            title:'student lists : StudentEse',
            students:students,
        });
    } catch(err){
        res.status(500).render('error.ejs',{
            title:'internal error : StudentEse'
        })
    }
}

export const registerStudent = async (req,res)=>{
    try{
        const {usn,fname,email,course} = req.body;
        const registered = await Student.findOne({usn});
        if(registered) return res.status(200).render('exist.ejs',{
            title:'student already exist : StudentEse',
        });
        await Student.create({usn,fname,email,course});
        res.status(201).render('success.ejs',{
            title:'student register successfully : StudentEse'
        });
    }catch(err){
        res.status(500).render('error.ejs',{
            title:'internal error : StudentEse'
        });
    }
}

export const registerForm = async (req,res)=>{
    try{
        res.status(200).render('register.ejs',{
            title:'student registration : StudentEse',
            heading:'Student Registration Form',
            student:null,
        });
    }catch(err){
        res.status(500).render('error.ejs',{
            title:'internal error : StudentEse'
        });
    }
}

export const updateStudent = async (req,res)=>{
   try{
        const ID = req.params.id;
        const{usn,fname,email,course} = req.body;
        const registered = await Student.find({usn});
        console.log(ID,registered[0])
        if(registered.length>1|| registered.length===1 && ID !== registered[0]._id.toString()) {
            return res.status(200).render('exist.ejs',
            {
                title:'student exist : StudentEse'
            })
        }
        
        await Student.findByIdAndUpdate(ID,{usn,fname,email,course});
        res.status(202).redirect('/students');
   }catch(err){
        res.status(500).render('error.ejs',{
            title:'internal error : StudentEse'
        });
   }
}

export const updateForm = async (req,res)=>{
   try{
        const ID = req.params.id;
        const student = await Student.findById(ID);
        if(!student) return res.status(400).render('notfound.ejs');
        res.status(200).render('update.ejs',{
            title: 'student update : StudentEse',
            std:student
        });
   }catch(err){
        res.status(500).render('error.ejs',{
            title:'internal error : StudentEse'
        });
   }
}


export const deleteStudent = async (req,res)=>{
    try{
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).redirect('/students');
    }catch(error){
        res.status(500).render('error.ejs',{
            title:'internal error : StudentEse'
        });
    }
}