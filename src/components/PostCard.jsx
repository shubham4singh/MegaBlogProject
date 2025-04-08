import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

/* Syntax of appwrite to write id with $ */
// featuredImage is fileId
function PostCard({ $id, title, featuredImage }) {

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-rose-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
            className='rounded-xl' />

        </div>

        <h2 className='text-xl font-bold'>
          {title}
        </h2>

      </div>
    </Link>
  )
}

export default PostCard
