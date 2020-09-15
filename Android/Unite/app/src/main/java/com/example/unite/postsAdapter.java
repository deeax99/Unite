package com.example.unite;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class postsAdapter extends RecyclerView.Adapter<postViewHolder> {
    String items[],description[];
    int images[];
    Context context;
    public postsAdapter(Context ct, String s1[],String s2[],int images[]){
        context=ct;
        items=s1;
        description=s2;
        this.images=images;
    }

    @NonNull
    @Override
    public postViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.post_item,parent,false);
        return new postViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull postViewHolder holder, int position) {

    }

    @Override
    public int getItemCount() {
        return 0;
    }
}
