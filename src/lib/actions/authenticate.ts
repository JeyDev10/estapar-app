"use server"

import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

import { LoginForm } from "@src/domain/interfaces/auth"
import { auth, signIn, signOut as signOutCallback } from "@/auth"

export async function authenticate(loginForm: LoginForm) {
  try {
    await signIn("credentials", { ...loginForm, redirect: false })
  } catch (error) {
    throw error
  }
}

export async function signOut() {
  try {
    await signOutCallback()
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    redirect("/login")
  }
}

export async function getAuth() {
  try {
    const userAuth = await auth()
    return userAuth
  } catch (error) {
    throw error
  }
}
