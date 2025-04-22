<div class="container px-4 py-8 mx-auto">
    <h1 class="mb-8 text-3xl font-bold text-center">Events</h1>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        @foreach ($events as $event)
        <div class="overflow-hidden bg-white rounded-lg shadow-md">
            <div class="p-4">
                <h2 class="mb-2 text-xl font-semibold">{{ $event->summary }}</h2>
            </div>
        </div>
        @endforeach
    </div>
</div>
