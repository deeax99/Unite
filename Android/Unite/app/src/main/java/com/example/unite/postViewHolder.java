package com.example.unite;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

class postViewHolder extends RecyclerView.ViewHolder {
    TextView item_name,item_description,item_participants;
    ImageView item_image;

    public postViewHolder(@NonNull View itemView) {
        super(itemView);
        item_name=itemView.findViewById(R.id.item_name);
        item_description=itemView.findViewById(R.id.item_description);
        item_participants=itemView.findViewById(R.id.item_participants);
        item_image=itemView.findViewById(R.id.item_image);
    }
}
