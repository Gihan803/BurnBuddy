<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    /**
     * List published blog posts (paginated).
     */
    public function index(Request $request): JsonResponse
    {
        $posts = BlogPost::published()
            ->with('author:id,name')
            ->orderBy('published_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json($posts);
    }

    /**
     * Show a single blog post by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $post = BlogPost::published()
            ->where('slug', $slug)
            ->with('author:id,name')
            ->firstOrFail();

        return response()->json([
            'post' => $post,
        ]);
    }
}
