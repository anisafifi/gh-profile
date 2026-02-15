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
    <section className=" bg-black text-lightestBlue border-gray-800 px-20 py-12 mx-auto md:px-8 md:py-8 sm:px-4 sm:py-4">
    <div className="bg-black text-lightestBlue max-w-300 mx-auto">
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
          <h1 className="text-2xl sm:text-xl mb-2 text-offWhite text-center">{userData.name}</h1>
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
        <div className="grid grid-cols-3 gap-2 justify-center ">
          <div className="flex flex-col items-center justify-center bg-darkGrey p-4 rounded text-center sm:p-2">
            <span className="text-offWhite text-lg sm:text-base font-semibold">
              {userData.public_repos?.toLocaleString()}
            </span>
            <Badge variant="secondary" className="mt-2 text-xs uppercase tracking-wider bg-transparent text-[rgba(200,225,255,0.7)] border-0 sm:text-[0.5rem]">
              Repositories
            </Badge>
          </div>
          <div className="flex flex-col items-center justify-center bg-darkGrey p-4 rounded text-center sm:p-2">
            <span className="text-offWhite text-lg sm:text-base font-semibold">
              {userData.followers?.toLocaleString()}
            </span>
            <Badge variant="secondary" className="mt-2 text-xs uppercase tracking-wider bg-transparent text-[rgba(200,225,255,0.7)] border-0 sm:text-[0.5rem]">
              Followers
            </Badge>
          </div>
          <div className="flex flex-col items-center justify-center bg-darkGrey p-4 rounded text-center sm:p-2">
            <span className="text-offWhite text-lg sm:text-base font-semibold">
              {userData.following?.toLocaleString()}
            </span>
            <Badge variant="secondary" className="mt-2 text-xs uppercase tracking-wider bg-transparent text-[rgba(200,225,255,0.7)] border-0 sm:text-[0.5rem]">
              Following
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
