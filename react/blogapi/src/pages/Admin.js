import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context'
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import ShowModal from '../components/ShowModal';

function Admin() {
    const {isLoading, error, posts, fetchPosts,
         user, modalState, setModalState, setNewData, deletePost} = 
         useGlobalContext();
    
    const handleCreate = () => {
        setModalState({
            isModalOpen: true,
            type: 'create'
        })
    }

    const handleEdit = (id) => {
        const specificPost = posts.find((item) => item.id ===id)
        console.log(specificPost);
        setNewData(specificPost)
        setModalState({
            isModalOpen: true,
            type: 'edit'
        })
    }

    const handleDelete = (id) => {
        deletePost(id)
    }

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts, user])

    if (isLoading) {
        return (
             <main className="page-100">
                <div className="loading"></div>
            </main>
        )
    }

    if (error.isError) {
        return (
            <main className="page-100">
                <div className="section section-center">
                    <h3 className="text-center">{error.msg}</h3>
                </div>
            </main>
        )
    }

    

    return (
        <main className="page-100">
            <Wrapper className="section">
                <div className="form-title title">
                    <h3>admin</h3>
                    <div className="underline"></div>
                </div>
                {posts.map((post, index) => {
                    const {title, excerpt, id} = post
                    return (
                        <ListView key={index}>
                            <div className="info">
                                <p>{index + 1}</p>
                                {
                                    title.length <= 15 ?
                                    <p>{title}</p> :
                                    <h5>
                                        {title.substr(0, 15)}...
                                    </h5>
                                }
                                {
                                    excerpt.length <= 30 ?
                                    <p>{excerpt}</p> :
                                    <p>{excerpt.substr(0, 30)}...</p>
                                }
                            </div>
                            
                            <div className="action">
                                <button type="button" 
                                    className="btn"
                                    onClick={() => handleEdit(id)}
                                >
                                    <FaPen />
                                </button>
                                <button type="button"
                                    className="btn"
                                    onClick={() => handleDelete(id)}
                                 >
                                    <FaTrash />
                                </button>
                            </div>
                        </ListView>
                    )
                })}
                <div className="create">
                    <button type="button" className="btn"
                    onClick={handleCreate}>
                        create
                    </button>
                </div>
                {modalState.isModalOpen && <ShowModal />}
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    min-height: 500px;
    justify-content: space-evenly;
    box-shadow: var(--light-shadow);
    .create {
        display: flex;
        justify-content: center;
        align-items: center;
        
        .btn {
            padding: 0.5rem 1rem;;
        }
    }
`

const ListView = styled.div`
    padding: 1.5rem;
    margin: 2rem 0;
    width: 100%;
    display: flex;
    box-shadow: var(--light-shadow);

    .info {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 1;
    }

    .action {
        padding: 1rem;
        display: flex;

        .btn {
            margin-left: 0.2rem;
        }
        svg {
            width: 1rem;
            height: 1rem;
        }
    }
   
`

export default Admin
