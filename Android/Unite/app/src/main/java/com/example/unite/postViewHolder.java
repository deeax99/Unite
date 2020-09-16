package com.example.unite;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

class postViewHolder extends RecyclerView.ViewHolder {
    TextView name,description;
    ImageView item_image;

    public postViewHolder(@NonNull View itemView) {
        super(itemView);
        name=itemView.findViewById(R.id.item_name);
        description=itemView.findViewById(R.id.item_description);

        item_image=itemView.findViewById(R.id.item_image);
    }
}
