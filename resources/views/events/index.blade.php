<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Events</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @foreach ($events as $event)
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="p-4">
                <h2 class="text-xl font-semibold mb-2">{{ $event->summary }}</h2>
            </div>
        </div>
        @endforeach
    </div>
</div>
