import React, {useEffect, useState} from 'react';
import HomeComponent from '../components/Home/HomeComponent';


const HomeContainer = () => {
    /**
     * @description loading api
     * @return boolean
     */
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    const getApi = async () => {
        try {
            setLoading(true)
            const req = await fetch('http://localhost:3001/movies', {method: "GET"})
            const res = await req.json()
            setData(res.message)
        }catch (e) {
            console.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setTimeout(async () => {
            await getApi()
        }, 2000)
    }, []);

 
    return (
        <div>
         
            {
                loading
                    ?
                    <p>En chargement...</p>
                    :
                    <HomeComponent data={data} />
            }
         
        </div>
    );
};



export default HomeContainer;
