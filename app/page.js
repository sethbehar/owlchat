"use client"
import React from 'react';
import { AuthContextProvider } from './AuthContext';
import NavMenu from './NavMenu';
import Chat from './chat';
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <AuthContextProvider>
        <NavMenu />
        <h1 className={styles.heading}>
          Global chat app, speak a vowel and you will be banned for life
        </h1>
        <Chat />
      </AuthContextProvider>
    </div>
  );
}