import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserData {
  avatar_url?: string;
  name?: string;
  login?: string;
  html_url?: string;
  company?: string;
  location?: string;
  created_at?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

interface UserInfoProps {
  userData: UserData;
}

export function UserInfo({ userData }: UserInfoProps) {
  if (!userData) return null;

  return (
    <section className=" bg-zinc-50 py-12 mx-auto md:px-8 md:py-8 sm:px-4 sm:py-4">
    <div className="  max-w-300 mx-auto">
      <div className="px-8 py-12 sm:px-4 sm:py-6">
        {/* Avatar */}
        {userData.avatar_url && (
          <div className="flex items-center justify-center mb-6">
            <Avatar className="w-36 h-36 border-2 border-blue">
              <AvatarImage src={userData.avatar_url} alt="avatar" />
              <AvatarFallback>{userData.login?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Name */}
        {userData.name && (
          <h1 className="m-0 text-[2.75rem] pb-1.5 md:text-[2.5rem] font-bold text-center">{userData.name}</h1>
        )}

        {/* Username */}
        {userData.login && (
          <h2 className="font-mono text-lg sm:text-base mb-4 text-center">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline focus:underline"
            >
              @{userData.login}
            </a>
          </h2>
        )}

        {/* Company / Location / Joined */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-center">
          {userData.company && (
            <span className="flex items-center whitespace-nowrap">
              <Briefcase size={16} className="mr-2" />
              {userData.company}
            </span>
          )}

          {userData.location && (
            <span className="flex items-center whitespace-nowrap">
              <MapPin size={16} className="mr-2" />
              {userData.location}
            </span>
          )}

          {userData.created_at && (
            <span className="flex items-center whitespace-nowrap">
              <Calendar size={16} className="mr-2" />
              Joined{" "}
              {new Date(userData.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Stats: Repos / Followers / Following */}
        <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
          <div className="flex flex-col items-center justify-center  bg-white p-3 rounded-xl text-center border border-gray-200">
            <span className=" text-4xl font-semibold">
              {userData.public_repos?.toLocaleString()}
            </span>
            <Badge variant="secondary" className="mt-2  uppercase tracking-wider bg-transparent">
              Repositories
            </Badge>
          </div>
          <div className="flex flex-col items-center justify-center  bg-white p-3 rounded-xl text-center border border-gray-200">
            <span className=" text-4xl font-semibold">
              {userData.followers?.toLocaleString()}
            </span>
            <Badge variant="secondary" className="mt-2 uppercase tracking-wider bg-transparent  border-0">
              Followers
            </Badge>
          </div>
          <div className="flex flex-col items-center justify-center  bg-white p-3 rounded-xl text-center border border-gray-200">
            <span className=" text-4xl font-semibold">
              {userData.following?.toLocaleString()}
            </span>
            <Badge variant="secondary" className="mt-2  uppercase tracking-wider bg-transparent border-0">
              Following
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
