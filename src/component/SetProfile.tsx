import { AvatarSelector } from "./AvatarSelector.tsx";
import React, { useState } from 'react';

export const SetProfile = (props: { 
  username?: string; 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  onAvatarChange: (newAvatar: string) => void; 
}) => {
  
  const [selectedAvatar, setSelectedAvatar] = useState<string>(""); // État pour stocker l'avatar sélectionné
  
  // Mise à jour de l'avatar et remontée au parent
  const handleAvatarChange = (newAvatar: string) => {
    setSelectedAvatar(newAvatar); // Mets à jour l'avatar localement
    props.onAvatarChange(newAvatar); // Remonte l'avatar au parent
  };

  return (
    <div className='setProfile manjari'>
      {/* AvatarSelector reçoit l'avatar sélectionné et une fonction pour mettre à jour l'avatar */}
      <AvatarSelector avatar={selectedAvatar} onAvatarChange={handleAvatarChange} />
      
      {/* Champ input pour le nom d'utilisateur */}
      <input 
        type="text" 
        id="inputBox" 
        placeholder="Username" 
        className="manjari" 
        value={props.username || ''} 
        onChange={props.onChange} 
      />
    </div>
  );
};
